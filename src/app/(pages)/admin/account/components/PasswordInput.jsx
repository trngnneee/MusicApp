"use client"

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";

export const PasswordInput = ({ password, setPassword, allowCheck = true, title="Mật khẩu" }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "Ít nhất 8 kí tự" },
      { regex: /[0-9]/, text: "Ít nhất 1 chữ số" },
      { regex: /[a-z]/, text: "Ít nhất 1 chữ viết thường" },
      { regex: /[A-Z]/, text: "Ít nhất 1 chữ viết hoa" },
      { regex: /[^A-Za-z0-9]/, text: "Ít nhất 1 ký tự đặc biệt" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score) => {
    if (score === 0) return "bg-border";
    if (score <= 2) return "bg-red-500";
    if (score === 3) return "bg-orange-500";
    if (score === 4) return "bg-yellow-500";
    if (score === 5) return "bg-emerald-500";
  };

  const getStrengthText = (score) => {
    if (score === 0) return "Nhập mật khẩu";
    if (score <= 2) return "Mật khẩu yếu";
    if (score === 3) return "Mật khẩu trung bình";
    if (score === 4) return "Mật khẩu khá";
    return "Mật khẩu mạnh";
  };

  return (
    <div>
      <div className="*">
        <div className="relative">
          <Input
            id="password"
            name="password"
            className="pe-9"
            placeholder={title}
            type={isVisible ? "text" : "password"}
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="password-description"
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className={cn(
        allowCheck ? "block" : "hidden"
      )}>
        <div
          className={"mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"}
          role="progressbar"
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={4}
          aria-label="Password strength"
        >
          <div
            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
            style={{ width: `${(strengthScore / 5) * 100}%` }}
          ></div>
        </div>

        <p
          id="password-description"
          className="mb-2 text-[12px] sm:text-sm font-medium text-foreground"
        >
          {getStrengthText(strengthScore)}. Mật khẩu nên bao gồm các yếu tố sau:
        </p>

        <ul className="space-y-1.5" aria-label="Password requirements">
          {strength.map((req, index) => (
            <li key={index} className="flex items-center gap-2">
              {req.met ? (
                <CheckIcon
                  size={16}
                  className="text-emerald-500"
                  aria-hidden="true"
                />
              ) : (
                <XIcon
                  size={16}
                  className="text-muted-foreground/80"
                  aria-hidden="true"
                />
              )}
              <span
                className={`text-[10px] sm:text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
              >
                {req.text}
                <span className="sr-only">
                  {req.met ? " - Requirement met" : " - Requirement not met"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}