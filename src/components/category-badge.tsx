import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
    category: string;
    className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
    return (
        <Link href={`/exercises?category=${encodeURIComponent(category)}`}>
            <Badge
                variant="secondary"
                className={cn(
                    "hover:bg-secondary/80 transition-colors cursor-pointer",
                    className
                )}
            >
                {category}
            </Badge>
        </Link>
    );
}
