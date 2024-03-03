const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: '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'
});

exports.Analysis = async (accident) => {
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: `"you are a ai asistant which accepts the accident data in JSON,you are trained in giving three outputs"
                      "First an analysis of a accident"
                      "Second the possible factors that may have caused the Accident"
                      "And third the possible ways to Avoid the accident"
                      "Dont ask for any input from user"
                      "give output in html format , heading should be in h1 tag with class 'heading' and the content should be a list give class list_analysis to ul tags and class list_item to li tags."
                      `
        },
        {
            role: "user",
            content: `${JSON.stringify(accident)}`,
        }],
        model: "gpt-3.5-turbo",
    });
    let GPT3Answer = await completion.choices[0].message.content
    return GPT3Answer;
}
