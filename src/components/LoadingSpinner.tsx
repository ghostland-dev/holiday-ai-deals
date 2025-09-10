import { Plane, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "travel" | "minimal";
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = "md", 
  variant = "default", 
  text, 
  className 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const containerSizeClasses = {
    sm: "gap-2 text-sm",
    md: "gap-3 text-base",
    lg: "gap-4 text-lg"
  };

  if (variant === "travel") {
    return (
      <div className={cn("flex flex-col items-center justify-center", containerSizeClasses[size], className)}>
        <div className="relative">
          <div className={cn("animate-spin", sizeClasses[size])}>
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          </div>
          <Plane className={cn("absolute inset-0 m-auto text-primary", sizeClasses[size === "lg" ? "md" : "sm"])} />
        </div>
        {text && (
          <p className="text-muted-foreground font-medium">{text}</p>
        )}
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center", containerSizeClasses[size], className)}>
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
        {text && <span className="text-muted-foreground">{text}</span>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", containerSizeClasses[size], className)}>
      <div className="relative">
        <div className={cn("animate-spin rounded-full border-4 border-primary/20 border-t-primary", sizeClasses[size])}></div>
      </div>
      {text && (
        <p className="text-muted-foreground font-medium mt-4">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;