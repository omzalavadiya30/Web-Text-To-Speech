const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const generateSpeech = async (data) => {
    let response;

    try {
        response = await fetch(`${API_BASE_URL}/tts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch {
        throw new Error("Unable to connect to the backend. Please try again.");
    }

    let result;
    try {
        result = await response.json();
    } catch {
        throw new Error("The backend returned an invalid response.");
    }

    if (!result || typeof result !== "object") {
        throw new Error("The backend returned an invalid response.");
    }

    if (!response.ok || result.success === false) {
        throw new Error(
            typeof result.message === "string" && result.message
                ? result.message
                : "The request could not be completed."
        );
    }

    return result;
};
