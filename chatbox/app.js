const apiKey = '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'; 

const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 获取用户输入
    const userMessage = userInput.value;

    // 显示用户消息
    appendMessage(userMessage, 'user');
    userInput.value = '';

    // 调用 ChatGPT API
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // 使用的 ChatGPT 模型
                messages: [{ role: 'user', content: userMessage }],
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const botMessage = data.choices[0].message.content;
            appendMessage(botMessage, 'bot');
        } else {
            appendMessage(`Error: ${data.error.message}`, 'bot');
        }
    } catch (error) {
        appendMessage('Error: Unable to connect to ChatGPT.', 'bot');
    }
});

// 在聊天框中添加消息
function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);

    // 自动滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;
}
