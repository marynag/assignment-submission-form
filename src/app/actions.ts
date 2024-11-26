"use server";

import { API_URL } from "@/components/constants";

interface IFormData {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}

export async function createCandidateForm(requestBody: IFormData) {
  try {
    const response = await fetch(`${API_URL}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorText =
        errorData.errors && errorData.errors.length > 0
          ? errorData.errors.map((error: string) => error).join(", ")
          : "";

      return {
        success: false,
        error: `${errorData.message} ${errorText}` || "Failed to send form",
      };
    }

    const responseData = await response.json();
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  }
}

export const sendForm = async (
  name: string,
  email: string,
  description: string,
  gitRepoUrl: string,
  level: string
) => {
  const formData: IFormData = {
    name: name,
    email: email,
    assignment_description: description,
    github_repo_url: gitRepoUrl,
    candidate_level: level,
  };

  return await createCandidateForm(formData);
};

export async function getLevels() {
  try {
    const response = await fetch(`${API_URL}/levels`);
    if (!response.ok) {
      throw new Error("Failed to fetch levels");
    }
    const data = await response.json();

    return {
      data: data.levels ?? [],
      success: true,
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("Error fetching levels:", errorMessage);

    return {
      data: [],
      success: false,
      error: errorMessage,
    };
  }
}
