import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

function Service() {
  const navigate = useNavigate();
  return (
    <div className="py-20 bg-blue-100 border border-blue-400 text-blue-700 p-4 rounded-lg flex flex-col items-center space-y-2">
      <h2 className="text-lg font-semibold mb-2 text-center">
        🚧 아직 개장 준비 중입니다.
      </h2>
      <p className="pb-3 text-center">
        조금만 기다려 주시면 바로 모시도록 하겠습니다!
      </p>
      <Button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
}

export default Service;
