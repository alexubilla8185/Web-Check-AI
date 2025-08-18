import { Status, TestAction } from '../types';
import type { QAResults, TestSuite, TestRunResult } from '../types';

export const mockQAResults: QAResults = {
  performance: [
    {
      name: 'First Contentful Paint (FCP)',
      status: Status.PASS,
      description: 'Marks the time at which the first text or image is painted. The FCP is well under 1.8 seconds.',
      recommendation: 'No action needed. The First Contentful Paint is fast.',
    },
    {
      name: 'Largest Contentful Paint (LCP)',
      status: Status.WARN,
      description: 'Marks the time at which the largest text or image is painted. The LCP is 2.8s, slightly above the recommended 2.5s.',
      recommendation: 'Optimize the main hero image or large text blocks to improve LCP.',
    },
    {
      name: 'Image Optimization',
      status: Status.FAIL,
      description: 'Checks if images are properly compressed and served in next-gen formats like WebP.',
      recommendation: 'Compress JPEG/PNG images and convert them to WebP format to save bandwidth.',
    },
    {
      name: 'Reduce Unused JavaScript',
      status: Status.PASS,
      description: 'Checks for and removes any JavaScript code that is not being used to speed up page loads.',
      recommendation: 'No action needed. Tree-shaking and code-splitting appear to be implemented effectively.',
    },
    {
        name: 'Minimize Main-Thread Work',
        status: Status.WARN,
        description: 'Measures the time spent parsing, compiling, and executing JS. High values can make the page unresponsive.',
        recommendation: 'Consider code-splitting to break up long tasks and reduce main-thread work.'
    }
  ],
  accessibility: [
    {
      name: 'Image Alt Tags',
      status: Status.FAIL,
      description: 'All images must have descriptive alt tags for screen readers. Several key images are missing them.',
      recommendation: "Add descriptive alt text to all `<img>` elements to improve screen reader compatibility.",
    },
    {
      name: 'Color Contrast',
      status: Status.PASS,
      description: 'Text and background colors have sufficient contrast ratio, making them readable for visually impaired users.',
      recommendation: 'No action needed. Color contrast meets WCAG AA guidelines.',
    },
    {
      name: 'Keyboard Navigation',
      status: Status.PASS,
      description: 'All interactive elements are focusable and reachable using the Tab key.',
      recommendation: 'No action needed. The site is fully navigable via keyboard.',
    },
    {
        name: 'ARIA Roles',
        status: Status.WARN,
        description: 'Checks for proper use of ARIA (Accessible Rich Internet Applications) roles to define UI element functions.',
        recommendation: 'Some custom components are missing ARIA roles (e.g., role="button"). Add them to improve accessibility.'
    },
    {
        name: 'Form Input Labels',
        status: Status.PASS,
        description: 'All form inputs are correctly associated with a <label> element.',
        recommendation: 'No action needed. Forms are correctly labeled.'
    }
  ],
  seo: [
    {
      name: 'Meta Title & Description',
      status: Status.PASS,
      description: 'The page has a unique, descriptive meta title and description within optimal length.',
      recommendation: 'No action needed. Meta tags are well-written.',
    },
    {
      name: 'Canonical Tags',
      status: Status.PASS,
      description: 'Proper use of `rel="canonical"` tags to prevent duplicate content issues.',
      recommendation: 'No action needed. Canonical tags are correctly implemented.',
    },
    {
      name: 'Robots.txt',
      status: Status.FAIL,
      description: 'Checks for a valid robots.txt file to guide search engine crawlers.',
      recommendation: 'Create a robots.txt file in the root directory to specify which pages should or should not be indexed.',
    },
    {
        name: 'Structured Data (Schema.org)',
        status: Status.WARN,
        description: 'Checks for structured data to help search engines understand the content (e.g., Product, Review).',
        recommendation: 'Implement structured data for products and reviews to enable rich snippets in search results.'
    },
  ],
};

export const mockTestSuites: TestSuite[] = [
    {
        id: 'mock-suite-1',
        title: 'Successful User Login',
        targetUrl: 'https://example-shop.com/login',
        steps: [
            { action: TestAction.NAVIGATE, description: 'Navigate to the login page' },
            { action: TestAction.TYPE, description: 'Type "testuser@example.com" into the email field' },
            { action: TestAction.TYPE, description: 'Type "password123" into the password field' },
            { action: TestAction.CLICK, description: 'Click the "Sign In" button' },
            { action: TestAction.VERIFY_URL, description: 'Verify the URL is now "https://example-shop.com/dashboard"' },
            { action: TestAction.VERIFY_TEXT, description: 'Verify the text "Welcome, Test User!" is visible' },
        ]
    },
    {
        id: 'mock-suite-2',
        title: 'Failed Checkout with Invalid Coupon',
        targetUrl: 'https://example-shop.com/cart',
        steps: [
            { action: TestAction.NAVIGATE, description: 'Navigate to the shopping cart page' },
            { action: TestAction.VERIFY_VISIBLE, description: 'Verify the checkout button is visible' },
            { action: TestAction.TYPE, description: 'Type "INVALIDCODE" into the coupon code field' },
            { action: TestAction.CLICK, description: 'Click the "Apply Coupon" button' },
            { action: TestAction.VERIFY_TEXT, description: 'Verify the error message "Invalid coupon code" is visible' },
        ]
    }
];

export const mockTestRunResults: Record<string, TestRunResult> = {
    'mock-suite-1': {
        id: 'mock-run-1',
        testSuiteId: 'mock-suite-1',
        title: 'Successful User Login',
        targetUrl: 'https://example-shop.com/login',
        summary: 'The user was able to successfully log in and was redirected to the dashboard. All verification steps passed.',
        status: Status.PASS,
        completedAt: new Date().toISOString(),
        steps: [
            { action: TestAction.NAVIGATE, description: 'Navigate to https://example-shop.com/login', status: Status.PASS, result: 'Successfully navigated to the login page.' },
            { action: TestAction.TYPE, description: 'Type "testuser@example.com" into input with id="email"', status: Status.PASS, result: 'Typed text into the email field.' },
            { action: TestAction.TYPE, description: 'Type "•••••••••" into input with id="password"', status: Status.PASS, result: 'Typed text into the password field.' },
            { action: TestAction.CLICK, description: 'Click the "Sign In" button with id="login-btn"', status: Status.PASS, result: 'Clicked the sign-in button.' },
            { action: TestAction.VERIFY_URL, description: 'Verify the URL is now "https://example-shop.com/dashboard"', status: Status.PASS, result: 'URL successfully changed to the dashboard URL.' },
            { action: TestAction.VERIFY_TEXT, description: 'Verify the text "Welcome, Test User!" is visible in h1 tag', status: Status.PASS, result: 'The welcome message was found on the page.' },
        ]
    },
    'mock-suite-2': {
        id: 'mock-run-2',
        testSuiteId: 'mock-suite-2',
        title: 'Failed Checkout with Invalid Coupon',
        targetUrl: 'https://example-shop.com/cart',
        summary: 'The test failed because the expected error message for an invalid coupon was not displayed correctly. The system showed a generic error instead.',
        status: Status.FAIL,
        completedAt: new Date().toISOString(),
        steps: [
            { action: TestAction.NAVIGATE, description: 'Navigate to https://example-shop.com/cart', status: Status.PASS, result: 'Successfully navigated to the shopping cart.' },
            { action: TestAction.VERIFY_VISIBLE, description: 'Verify the checkout button with id="checkout" is visible', status: Status.PASS, result: 'The checkout button was visible and enabled.' },
            { action: TestAction.TYPE, description: 'Type "INVALIDCODE" into the coupon code field with id="coupon-code"', status: Status.PASS, result: 'Typed text into the coupon field.' },
            { action: TestAction.CLICK, description: 'Click the "Apply Coupon" button', status: Status.PASS, result: 'Clicked the apply coupon button.' },
            { 
                action: TestAction.VERIFY_TEXT, 
                description: 'Verify the error message "Invalid coupon code" is visible', 
                status: Status.FAIL, 
                result: 'Failed: The expected error message was not found. Instead, a generic "An error occurred" message was shown.',
                screenshotPrompt: 'A checkout page with a coupon code input field containing "INVALIDCODE". Below the field, a red error message box shows the text "An error occurred" instead of "Invalid coupon code".',
                screenshotUrl: 'https://placehold.co/1280x720/1f2937/ef4444/png?text=Error!%0A%0AAn+error+occurred'
            },
        ]
    }
};
