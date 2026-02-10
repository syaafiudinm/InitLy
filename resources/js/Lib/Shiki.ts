import { codeToHtml } from "shiki";

export async function highlightCommand(code: string) {
    return codeToHtml(code, {
        lang: "bash",
        theme: "one-dark-pro",
    });
}
