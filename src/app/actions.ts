"use server";

interface IFormData {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}

export async function createCandidateForm(requestBody: IFormData) {
  try {
    const response = await fetch(
      "https://tools.qa.public.ale.ai/api/tools/candidates/levels",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create candidate level");
    }

    const responseData = await response.json();
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
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
