"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { useCreateComment } from "@/hooks";
import { useToast } from "@/components/providers";
import { Send, Loader2 } from "lucide-react";

interface CommentFormProps {
  taskId: string;
  parentId?: string;
  onSuccess?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function CommentForm({
  taskId,
  parentId,
  onSuccess,
  placeholder = "Write a comment...",
  autoFocus = false,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const { mutate, isPending } = useCreateComment();
  const { success, error } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { content: content.trim(), taskId, parentId },
      {
        onSuccess: (result) => {
          if (result.success) {
            setContent("");
            success("Comment added successfully");
            onSuccess?.();
          } else {
            error(result.message);
          }
        },
        onError: () => {
          error("Failed to add comment");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        autoFocus={autoFocus}
        className="resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isPending || !content.trim()}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {parentId ? "Reply" : "Comment"}
        </Button>
      </div>
    </form>
  );
}
