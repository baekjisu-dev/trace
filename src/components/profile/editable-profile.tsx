import type { ProfileEntity } from "@/types";
import { Button } from "../ui/button";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface EditableProfileProps {
  profile?: ProfileEntity;
  fileRef: React.RefObject<HTMLInputElement | null>;
  avatarImageUrl: string;
  setIsEdit: (isEdit: boolean) => void;
  setAvatarImageUrl: (avatarImageUrl: string) => void;
}

const editProfileSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
  avatarImageFile: z.instanceof(File).optional(),
  bio: z.string().max(100, "최대 100자까지 입력할 수 있어요.").optional(),
});

export const EditableProfile = ({
  profile,
  avatarImageUrl,
  setIsEdit,
  fileRef,
  setAvatarImageUrl,
}: EditableProfileProps) => {
  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        setIsEdit(false);
        toast.success("프로필이 수정되었어요.", {
          position: "top-center",
        });
      },
      onError: () => {
        toast.error("프로필 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
          position: "top-center",
        });
      },
    });

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      avatarImageFile: undefined,
      nickname: profile?.nickname ?? "",
      bio: profile?.bio ?? "",
    },
  });

  const handleCancel = () => {
    setIsEdit(false);

    if (form.getValues("avatarImageFile")) {
      URL.revokeObjectURL(avatarImageUrl);
      setAvatarImageUrl(profile?.avatar_url ?? "");
    }

    form.reset();
  };

  const onSubmit = (data: z.infer<typeof editProfileSchema>) => {
    if (!profile?.id) return;

    if (data.avatarImageFile) {
      URL.revokeObjectURL(avatarImageUrl);
    }

    updateProfile({
      userId: profile.id,
      nickname: data.nickname,
      bio: data.bio ?? "",
      avatarImageFile: data.avatarImageFile ?? undefined,
    });
  };

  return (
    <form
      className="flex flex-col items-center gap-1"
      id="edit-profile-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="w-[200px] md:w-[300px] gap-2">
        <Controller
          name="nickname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                id="editable-profile-nickname"
                aria-invalid={fieldState.invalid}
                placeholder="개성있는 닉네임을 입력해 주세요."
                disabled={isUpdateProfilePending}
                {...field}
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                className="resize-none h-12"
                id="editable-profile-bio"
                aria-invalid={fieldState.invalid}
                placeholder="나를 나타낼 수 있는 한마디를 입력해 주세요."
                disabled={isUpdateProfilePending}
                maxLength={100}
                {...field}
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="avatarImageFile"
          control={form.control}
          render={({ field }) => (
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                field.onChange(file);
                setAvatarImageUrl(URL.createObjectURL(file));
              }}
            />
          )}
        />
      </FieldGroup>
      <div className="flex justify-center gap-2 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          disabled={isUpdateProfilePending}
        >
          취소
        </Button>
        <Button
          variant="default"
          size="sm"
          type="submit"
          form="edit-profile-form"
          disabled={isUpdateProfilePending}
        >
          저장
        </Button>
      </div>
    </form>
  );
};
