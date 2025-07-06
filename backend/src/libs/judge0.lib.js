import axios from "axios"

export const getJudge0LanguageId = (language)=>{
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }

    return languageMap[language.toUpperCase()]
}

// const sleep  = (ms)=> new Promise((resolve)=> setTimeout(resolve , ms))

// import axios from "axios";

// Define sleep manually
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens, maxAttempts = 15, interval = 1500) => {
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
          fields: "*", // include stdout, stderr, compile_output, etc.
        },
      });

      const results = data.submissions;

      const isAllDone = results.every(
        (r) => r.status.id !== 1 && r.status.id !== 2
      );

      if (isAllDone) {
        return results;
      }

      console.log(`⏳ Polling attempt ${attempt + 1}: Some submissions still pending...`);
      await sleep(interval);
      attempt++;
    } catch (err) {
      console.error("🚨 Error polling Judge0:", err.message || err);
      break; // Exit if Judge0 is unreachable
    }
  }

  throw new Error("❌ Timeout: Judge0 did not return results in time.");
};


export const submitBatch = async (submissions)=>{
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    })


    console.log("Submission Results: ", data)

    return data // [{token} , {token} , {token}]
}


export function getLanguageName(languageId){
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }

    return LANGUAGE_NAMES[languageId] || "Unknown"
}