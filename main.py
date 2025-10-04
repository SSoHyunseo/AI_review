from fastapi import FastAPI, Request
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()
model = SentenceTransformer('all-MiniLM-L6-v2')

class ReviewInput(BaseModel):
    review: str # 사용자가 작성한 리뷰
    ad_reviews: list[str] # 비교 대상의 광고성리뷰

ad_keywords = ['무료', '무료제공', '리뷰어', '체험단', '무상', '협찬', '이벤트', '제품제공']
non_ad_keywords = ['내돈내산', '직접 구매', '직접 구입', '과장광고', '그나마', '별로', '너무 비싸']
# 굳이 있어야할까?
negative_phrases = ['별로', '실망', '비쌈', '후회', '돈 아까움', '비추', '안 좋음', '안 먹음']

def match_keywords(text, keyword_list):
    return [kw for kw in keyword_list if kw in text]


def analyze_review(user_review, ad_reviews, threshold=0.7):
    user_vec = model.encode(user_review) # 벡터화
    ad_vecs = np.array([model.encode(r) for r in ad_reviews])
    similarities = cosine_similarity([user_vec], ad_vecs)[0] # 유사도 계산

    max_idx = np.argmax(similarities)
    max_score = similarities[max_idx]
    most_similar = ad_reviews[max_idx]

    # 키워드 검색
    matched_keywords = match_keywords(user_review, ad_keywords)
    matched_non_ad_keywords = match_keywords(user_review, non_ad_keywords)
    matched_negative_phrases = match_keywords(user_review, negative_phrases)

    # 키워드 가중치 계산
    keyword_adjustment = (
        0.05 * len(matched_keywords)
        - 0.1 * len(matched_non_ad_keywords)
        - 0.1 * len(matched_negative_phrases)
    )

    if not matched_keywords and (len(matched_non_ad_keywords) + len(matched_negative_phrases)) >= 4:
        max_score = 0.1

    adjusted_score = max(0, min(1, max_score + keyword_adjustment))
    judgment = "광고성 리뷰일 가능성 높음" if adjusted_score >= threshold else "광고성 리뷰일 가능성 낮음"
    
    # 비광고 키워드 생략할지 말지
    return {
        "입력 리뷰": user_review,
        "유사도 점수": round(float(adjusted_score) * 100, 2),
        "가장 유사한 광고 리뷰": most_similar if judgment.startswith("광고성") else "",
        "광고 키워드": matched_keywords,
        "비광고 키워드": matched_non_ad_keywords + matched_negative_phrases,
        "판단": judgment
    }

# 서버 상태 확인용
@app.get("/")
def root():
    return {"message": "FastAPI 서버가 정상 작동 중입니다."}

# 서버 응답 확인
@app.post("/analyze")
def analyze(data: ReviewInput):
    #print("✅ 요청 도착:", data.dict())
    data.dict
    result = analyze_review(data.review, data.ad_reviews)


    response = {
        "입력 리뷰": data.review,
        "유사도 점수": result["유사도 점수"],
        "가장 유사한 광고 리뷰": result["가장 유사한 광고 리뷰"],
        "광고 키워드": result["광고 키워드"],
        "비광고 키워드": result["비광고 키워드"],
        "판단": result["판단"]
    }

    print("✅ 응답 반환:", response)
    return response

