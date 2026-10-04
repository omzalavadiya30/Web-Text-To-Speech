const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const request = async (path, options) => {
    let response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, options);
    } catch {
        throw new Error("Unable to connect to the server. Please try again.");
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

    if (!response.ok || result.success !== true) {
        throw new Error(
            typeof result.message === "string" && result.message
                ? result.message
                : "The request could not be completed."
        );
    }

    return result;
};

export const getVoices = async () => {
    const result = await request("/voices");
    if (!Array.isArray(result.voices)) {
        throw new Error("The server returned an invalid voice list.");
    }
    return result.voices;
};

export const generateSpeech = async (data) => {
    const result = await request("/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!result || typeof result !== "object" || !result.data || typeof result.data !== "object") {
        throw new Error("The server returned invalid speech data.");
    }

    const { audioUrl, id } = result.data;

    if (typeof audioUrl !== "string" || !audioUrl) {
        throw new Error("Audio URL was not returned by the server.");
    }

    if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("Speech record ID was not returned by the server.");
    }

    return result.data;
};