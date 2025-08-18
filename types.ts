
export enum Status {
    PASS = 'PASS',
    FAIL = 'FAIL',
    WARN = 'WARN',
}

export interface CheckResult {
    name: string;
    status: Status;
    description: string;
    recommendation: string;
    codeSnippet?: string;
}

export interface QAResults {
    performance: CheckResult[];
    accessibility: CheckResult[];
    seo: CheckResult[];
}

// === Automated Testing Types V2 ===

export enum TestAction {
    NAVIGATE = 'NAVIGATE',
    CLICK = 'CLICK',
    TYPE = 'TYPE',
    VERIFY_TEXT = 'VERIFY_TEXT',
    VERIFY_VISIBLE = 'VERIFY_VISIBLE',
    VERIFY_URL = 'VERIFY_URL',
    API_REQUEST = 'API_REQUEST',
}

export interface TestStep {
    action: TestAction;
    description: string;
    // Fields added by the AI during simulation
    status?: Status.PASS | Status.FAIL;
    result?: string;
    screenshotPrompt?: string | null; // Prompt for image generation on failure
    screenshotUrl?: string; // Base64 URL of the generated image
}

// Represents the definition of a test case created by a user
export interface TestSuite {
    id: string;
    title: string;
    targetUrl: string;
    steps: TestStep[]; // User-defined steps without results
}

// Represents the result of a single, simulated test run
export interface TestRunResult {
    id: string;
    testSuiteId: string;
    title: string;
    targetUrl: string;
    summary: string;
    status: Status.PASS | Status.FAIL;
    completedAt: string;
    steps: TestStep[]; // Steps with simulated results
}
