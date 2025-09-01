from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
rsp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role":"user","content":"테스트: 안녕 GPT!"}]
)
print(rsp.choices[0].message.content)