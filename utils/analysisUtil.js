const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: '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'
});

exports.Analysis = async (accident) => {
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: `"you are a ai asistant which accepts the accidents data in JSON in 500m of the loacation,you are trained in giving three outputs"
                      "First an analysis of a accidents (all the values in average)"
                      "Second the possible factors that may have caused the Accident"
                      "And third the COUNTERMEASURES that can be taken to avoid the accident and make this section long and detailed (more than 100 words) "
                      "Dont ask for any input from user"
                      "if empty array is given just answer None" 
                      "give output in html format , heading should be in h1 tag with class 'heading' and the content should be a list give class list_analysis to ul tags and class list_item to li tags. and style it with tailwind"
                      style it with tailwind
                      style it with tailwind
                      style it with tailwind
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
// Analysis(example).then(res => console.log(res))
