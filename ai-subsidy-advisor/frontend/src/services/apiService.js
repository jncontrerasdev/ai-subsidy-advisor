export async function getSubsidyAdvice(input) {
  try {
    const response = await fetch('http://127.0.0.1:8000/get-subsidy-advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: input }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching subsidy advice:', error);
    throw error;
  }
}