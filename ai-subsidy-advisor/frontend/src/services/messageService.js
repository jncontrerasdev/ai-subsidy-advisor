import { getSubsidyAdvice } from './apiService';

export const handleSendMessage = async (input, setMessages, setError, setLoading) => {
  setError(null);
  setLoading(true);

  setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);

  // Fetch AI's response
  try {
    const response = await getSubsidyAdvice(input);

    setMessages(prevMessages => [
      ...prevMessages,
      { text: response.advice, sender: 'ai', confidence: response.confidence }
    ]);
  } catch (err) {
    setError("Er is een fout opgetreden. Probeer het opnieuw.");
  } finally {
    setLoading(false);
  }
};