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
      return {
        success: false,
        error: errorData.message || "Failed to create candidate level",
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
