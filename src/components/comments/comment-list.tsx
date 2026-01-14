"use client";

import { useComments } from "@/hooks";
import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MessageSquare, Loader2 } from "lucide-react";
import { useRealTimeComments } from "@/hooks/use-realtime-comments";

interface CommentListProps {
  taskId: string;
}

export function CommentList({ taskId }: CommentListProps) {
  const { data: comments, isLoading, error } = useComments(taskId);

  useRealTimeComments(taskId);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-6 pb-4">
        <MessageSquare className="text-brand-600 h-5 w-5" />
        <CardTitle>
          Comments
          {comments && comments.length > 0 && (
            <span className="text-brand-500 ml-2 text-sm font-normal">
              ({comments.length})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CommentForm taskId={taskId} />

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-brand-400 h-6 w-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-danger-500 py-4 text-center text-sm">
            Failed to load comments
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="divide-brand-100 divide-y">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} taskId={taskId} />
            ))}
          </div>
        ) : (
          <div className="text-brand-500 py-8 text-center text-sm">
            No comments yet. Be the first to comment!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
