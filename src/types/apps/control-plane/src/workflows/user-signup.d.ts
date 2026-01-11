/**
 * Workflow that handles the user signup process.
 *
 * This function orchestrates the steps involved in signing up a new user, including:
 * 1. Assigning an environment.
 * 2. Creating the user record.
 * 3. Sending a welcome email.
 * 4. Waiting for a delay.
 * 5. Sending an onboarding email.
 *
 * It acts as a workflow entry point using the `"use workflow"` directive.
 *
 * @param email - The email address of the user signing up.
 * @returns An object containing the new user's ID and their status.
 */
export declare function handleUserSignup(email: string): Promise<{
    userId: `${string}-${string}-${string}-${string}-${string}`;
    status: string;
}>;
