"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { Comment, useDeleteComment, useUpdateComment } from "@/hooks";
import { useToast } from "@/components/providers";
import { useSession } from "next-auth/react";
import { Button, Textarea } from "@/components/ui";
import { CommentForm } from "./comment-form";
import {
  MessageCircle,
  Edit2,
  Trash2,
  X,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface CommentItemProps {
  comment: Comment;
  taskId: string;
  depth?: number;
}

export function CommentItem({ comment, taskId, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReplies, setShowReplies] = useState(true);

  const { data: session } = useSession();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { success, error } = useToast();

  const isOwner = session?.user?.id === comment.userId;
  const hasReplies = (comment.replies?.length || 0) > 0;
  const maxDepth = 2;

  const handleDelete = () => {
    if (!confirm("Delete this comment?")) return;

    deleteComment(
      { commentId: comment.id, taskId },
      {
        onSuccess: (result) => {
          if (result.success) {
            success("Comment deleted");
          } else {
            error(result.message);
          }
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!editContent.trim()) return;

    updateComment(
      {
        commentId: comment.id,
        content: editContent.trim(),
        taskId,
      },
      {
        onSuccess: (result) => {
          if (result.success) {
            success("Comment updated");
          } else {
            error(result.message);
          }
        },
      }
    );
  };

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn(depth > 0 && "border-brand-100 ml-8 border-l-2 pl-4")}>
      <div className="group flex gap-3 py-3">
        {/* Avatar */}
        <div className="bg-brand-100 border-brand-200 text-brand-700 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border text-xs font-bold">
          {comment.user.image ? (
            <Image
              src={comment.user.image}
              alt={comment.user.name || "User"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            getInitials(comment.user.name)
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-brand-900 text-sm font-medium">
              {comment.user.name || "Anonymous"}
            </span>
            <span className="text-brand-400 text-xs">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
            {comment.createdAt !== comment.updatedAt && (
              <span className="text-brand-400 text-xs">(edited)</span>
            )}
          </div>

          {isEditing ? (
            <div className="mt-2 space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={2}
                className="resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleUpdate}
                  disabled={isUpdating || !editContent.trim()}
                >
                  {isUpdating ? (
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  ) : (
                    <Check className="mr-1 h-3 w-3" />
                  )}
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                >
                  <X className="mr-1 h-3 w-3" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-brand-700 mt-1 text-sm whitespace-pre-wrap">
              {comment.content}
            </p>
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {depth < maxDepth && (
                <Button
                  onClick={() => setIsReplying(!isReplying)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  aria-label="Reply"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              )}

              {isOwner && (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    aria-label="Edit comment"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    aria-label="Delete comment"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </>
              )}

              {/* Toggle replies */}
              {hasReplies && (
                <Button
                  onClick={() => setShowReplies(!showReplies)}
                  size="sm"
                  variant="ghost"
                  className="ml-2 h-8 px-2"
                >
                  {showReplies ? (
                    <ChevronUp className="mr-2 h-3 w-3" />
                  ) : (
                    <ChevronDown className="mr-2 h-3 w-3" />
                  )}
                  {comment.replies?.length}{" "}
                  {comment.replies?.length === 1 ? "reply" : "replies"}
                </Button>
              )}
            </div>
          )}

          {/* Reply Form */}
          {isReplying && !isEditing && (
            <div className="mt-3">
              <CommentForm
                taskId={taskId}
                parentId={comment.id}
                onSuccess={() => setIsReplying(false)}
                placeholder="Write a reply..."
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {hasReplies && showReplies && (
        <div className="mt-1">
          {comment.replies?.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              taskId={taskId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
