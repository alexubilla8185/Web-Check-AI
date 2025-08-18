
import { GoogleGenAI, Type } from "@google/genai";
import type { QAResults, TestRunResult, TestSuite, TestStep } from '../types';
import { Status, TestAction } from '../types';

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY as string;
if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. This will likely fail.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const checkItemSchema = {
    type: Type.OBJECT,
    properties: {
        name: { 
            type: Type.STRING,
            description: "The specific name of the check performed (e.g., 'Image Alt Tags')." 
        },
        status: { 
            type: Type.STRING,
            description: "The result of the check. Must be one of: 'PASS', 'FAIL', 'WARN'.",
            enum: [Status.PASS, Status.FAIL, Status.WARN]
        },
        description: { 
            type: Type.STRING,
            description: "A brief, one-sentence explanation of what this check is for and its result." 
        },
        recommendation: { 
            type: Type.STRING,
            description: "A one-sentence, actionable recommendation for fixing the issue if status is not 'PASS'. If 'PASS', state that no action is needed." 
        },
        codeSnippet: {
            type: Type.STRING,
            description: "An actionable, brief code snippet to fix the issue if status is not 'PASS'. For example, '<img src=\"...\" alt=\"A descriptive alt text.\">'. If 'PASS' or not applicable, this must be null."
        }
    },
    required: ["name", "status", "description", "recommendation"],
};

const qaResultsSchema = {
    type: Type.OBJECT,
    properties: {
        performance: {
            type: Type.ARRAY,
            description: "A list of performance audit results.",
            items: checkItemSchema,
        },
        accessibility: {
            type: Type.ARRAY,
            description: "A list of accessibility audit results.",
            items: checkItemSchema,
        },
        seo: {
            type: Type.ARRAY,
            description: "A list of SEO audit results.",
            items: checkItemSchema,
        },
    },
    required: ["performance", "accessibility", "seo"],
};

export const analyzeWebsite = async (url: string): Promise<QAResults> => {
    const prompt = `
        You are an expert automated website quality assurance tool.
        Your task is to conduct a simulated analysis of the website at the URL: ${url}.
        Do not attempt to access the URL directly. Instead, generate a realistic-looking audit based on common issues found on websites of this type.
        Provide a detailed report on its performance, accessibility, and SEO.
        For each category, list 5-7 specific checks.
        For each check, provide its name, a status ('PASS', 'FAIL', or 'WARN'), a brief description of the check, and a recommendation for improvement if it's not a 'PASS'.
        If a check is 'FAIL' or 'WARN', also provide a concise, actionable 'codeSnippet' that would fix the issue. For example, for a missing alt tag, the snippet could be an example '<img>' tag with a proper alt attribute. If no snippet is applicable or the check passes, this field should be null.
        Your response must strictly follow the provided JSON schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: qaResultsSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResults: QAResults = JSON.parse(jsonText);
        
        if (!parsedResults.performance || !parsedResults.accessibility || !parsedResults.seo) {
            throw new Error("Invalid data structure received from API.");
        }

        return parsedResults;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI. The model may have returned an invalid response.");
    }
};

const testStepSchema = {
    type: Type.OBJECT,
    properties: {
        action: {
            type: Type.STRING,
            description: "The type of action to perform.",
            enum: Object.values(TestAction),
        },
        description: {
            type: Type.STRING,
            description: "A human-readable description of the step, including the target element and any relevant values.",
        },
        status: {
            type: Type.STRING,
            description: "The simulated result of the step execution.",
            enum: [Status.PASS, Status.FAIL],
        },
        result: {
            type: Type.STRING,
            description: "A one-sentence summary of the outcome of the step. Explain why it passed or failed.",
        },
        screenshotPrompt: {
            type: Type.STRING,
            description: "If the status is 'FAIL', provide a detailed, descriptive prompt for an image generation model to create a screenshot of the UI at the moment of failure. Example: 'A web login form with an error message 'Invalid password' displayed in red below the password field.' If the status is 'PASS', this must be null.",
        }
    },
    required: ["action", "description", "status", "result", "screenshotPrompt"],
};

const testRunSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A concise title for the overall test plan, based on the user's provided title."
        },
        targetUrl: {
            type: Type.STRING,
            description: "The root URL where the test starts."
        },
        summary: {
            type: Type.STRING,
            description: "A brief summary of the overall test result based on the simulated step outcomes."
        },
        status: {
            type: Type.STRING,
            description: "The final status of the test run, 'PASS' if all steps passed, 'FAIL' otherwise.",
            enum: [Status.PASS, Status.FAIL],
        },
        steps: {
            type: Type.ARRAY,
            description: "An array of the fully fleshed-out test steps with simulated results.",
            items: testStepSchema,
        },
    },
    required: ["title", "targetUrl", "summary", "status", "steps"],
};


export const simulateTestRun = async (testSuite: TestSuite): Promise<Omit<TestRunResult, 'id' | 'testSuiteId' | 'completedAt'>> => {
    const prompt = `
        You are an expert QA Automation Engineer who simulates test executions.
        Your task is to take a user-defined test suite and generate a simulated result.
        The user has provided the following details:
        - Test Title: "${testSuite.title}"
        - Target URL: "${testSuite.targetUrl}"
        - Test Steps:
        ${testSuite.steps.map((step, i) => `${i + 1}. ${step.action}: ${step.description}`).join('\n')}

        Do not attempt to access the URL directly.
        Your job is to process these user-defined steps and return a complete test run result. For each step, you must:
        1. Keep the original action and description largely intact, but you can refine the description to be more specific (e.g., adding specific CSS selectors as examples).
        2. **Simulate** a realistic 'PASS' or 'FAIL' status for the step. The overall test should have a mix of pass and fail to be realistic, unless it's a very simple flow.
        3. Write a clear 'result' message explaining *why* the step was simulated to pass or fail.
        4. If a step's status is 'FAIL', you **MUST** provide a detailed, descriptive prompt in the 'screenshotPrompt' field that could be used to generate an image of the UI at the moment of failure. For example: 'A banking website dashboard with a red error popup saying "Transaction failed: Insufficient funds."'. If the step's status is 'PASS', 'screenshotPrompt' **MUST** be null.
        5. Generate a final 'summary' and an overall 'status' for the whole test run based on the outcomes of the steps.
        
        Ensure the 'targetUrl' and 'title' in the response match what the user provided.
        Your response must strictly follow the provided JSON schema.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: testRunSchema,
            },
        });

        const jsonText = response.text.trim();
        // The AI returns the core fields, we'll wrap it in the full TestRunResult structure later.
        const parsedResult = JSON.parse(jsonText);

        if (!parsedResult.title || !parsedResult.steps || !parsedResult.summary) {
            throw new Error("Invalid data structure received from API for test plan.");
        }
        
        // Ensure the URL and title from the prompt are used, not one hallucinated by the model
        parsedResult.targetUrl = testSuite.targetUrl;
        parsedResult.title = testSuite.title;

        return parsedResult;

    } catch (error) {
        console.error("Error calling Gemini API for test run simulation:", error);
        throw new Error("Failed to generate test run from AI. The model may have returned an invalid response.");
    }
};

export const generateFailureImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: `Generate a realistic screenshot of a web application UI that illustrates the following failure scenario. The image should look like a modern, clean web page. Do not include any text that says "screenshot". Scene: ${prompt}`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("Image generation returned no images.");
        }
    } catch(error) {
        console.error("Error calling Imagen API:", error);
        // Return a placeholder or throw an error
        throw new Error("Failed to generate failure screenshot.");
    }
};

export const refactorCode = async (code: string, instruction: string): Promise<string> => {
    const prompt = `
        Based on the following instruction, refactor the provided code snippet.
        Only return the raw refactored code, with no extra explanations, introductions, or markdown formatting.
        
        Instruction: "${instruction}"

        Code to refactor:
        \`\`\`
        ${code}
        \`\`\`
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are an expert software engineer specializing in writing clean, efficient, and maintainable code. Your task is to refactor code snippets based on user instructions.",
                temperature: 0.2,
            },
        });

        const refactoredCode = response.text.trim();
        // The model might still wrap the code in markdown, so we remove it.
        return refactoredCode.replace(/^```(?:\w+\n)?/, '').replace(/```$/, '');
    } catch (error) {
        console.error("Error calling Gemini API for code refactoring:", error);
        throw new Error("Failed to refactor code. The model may have returned an invalid response.");
    }
};

const testStepGenerationItemSchema = {
    type: Type.OBJECT,
    properties: {
        action: {
            type: Type.STRING,
            description: "The type of action to perform.",
            enum: Object.values(TestAction),
        },
        description: {
            type: Type.STRING,
            description: "A human-readable description of the step, including the target element and any relevant values. Be specific and clear.",
        },
    },
    required: ["action", "description"]
};

const testStepGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        steps: {
            type: Type.ARRAY,
            description: "The array of generated test steps.",
            items: testStepGenerationItemSchema,
        }
    },
    required: ["steps"]
};

export const generateTestSteps = async (goal: string, url: string): Promise<Pick<TestStep, 'action' | 'description'>[]> => {
    const prompt = `
      You are an expert QA Automation Engineer who creates test plans.
      Based on the high-level goal and target URL provided, generate a series of test steps to accomplish it.
      - High-level Goal: "${goal}"
      - Target URL: "${url}"
      
      The steps should reflect actions a real user would take. Be specific in descriptions. For example, instead of "Enter credentials," use "Type 'user@example.com' into the email field" and "Type 'password' into the password field."
      Your response must strictly be a JSON object containing an array of steps, following the provided schema. Do not return anything else.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: testStepGenerationSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText);
        
        if (!parsedResult.steps || !Array.isArray(parsedResult.steps)) {
            throw new Error("AI returned an invalid structure for test steps.");
        }
        
        return parsedResult.steps;

    } catch(error) {
        console.error("Error calling Gemini API for test step generation:", error);
        throw new Error("Failed to generate test steps from AI.");
    }
};

const regexGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        regex: {
            type: Type.STRING,
            description: "The generated regular expression string. It should not be enclosed in slashes."
        },
        explanation: {
            type: Type.STRING,
            description: "A clear, step-by-step explanation of how the regular expression works. Use bullet points or numbered lists for clarity."
        }
    },
    required: ["regex", "explanation"]
};

export const generateRegex = async (description: string): Promise<{ regex: string; explanation: string; }> => {
    const prompt = `
        You are a regular expression expert. Based on the user's description, generate a regular expression and a clear, step-by-step explanation of how it works.
        Description: "${description}"
        Your response must be a JSON object that strictly follows the provided schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: regexGenerationSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error calling Gemini API for regex generation:", error);
        throw new Error("Failed to generate regex from AI.");
    }
};

export const generateUIComponent = async (description: string): Promise<string> => {
    const prompt = `
      You are an expert frontend developer specializing in React and Tailwind CSS.
      Based on the user's description, generate a single, self-contained React functional component using JSX and Tailwind CSS classes.
      - Do not include any imports for React as it will be globally available.
      - The component should be fully functional and styled according to the request.
      - Use placeholder data or images (e.g., from placehold.co) if needed.
      - Only return the raw code for the component, with no extra explanations, introductions, or markdown formatting.
      
      Description: "${description}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.1,
            },
        });

        const componentCode = response.text.trim();
        // The model might still wrap the code in markdown, so we remove it.
        return componentCode.replace(/^```(?:\w+\n)?/, '').replace(/```$/, '');
    } catch (error) {
        console.error("Error calling Gemini API for UI component generation:", error);
        throw new Error("Failed to generate component from AI.");
    }
};
