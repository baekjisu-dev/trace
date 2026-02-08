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

/** -----------------------------
 * @description 프로필 수정 컴포넌트
 * @param profile 프로필 정보
 * @param avatarImageUrl 아바타 이미지 URL
 * @param setIsEdit 프로필 수정 상태 설정 핸들러
 * @param fileRef 파일 참조
 * @param setAvatarImageUrl 아바타 이미지 URL 설정 핸들러
 * @returns 프로필 수정 컴포넌트
 * ----------------------------- */
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

  // * 폼 생성
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      avatarImageFile: undefined,
      nickname: profile?.nickname ?? "",
      bio: profile?.bio ?? "",
    },
  });

  // * 취소 핸들러
  const handleCancel = () => {
    setIsEdit(false);

    if (form.getValues("avatarImageFile")) {
      URL.revokeObjectURL(avatarImageUrl);
      setAvatarImageUrl(profile?.avatar_url ?? "");
    }

    form.reset();
  };

  // * 제출 핸들러
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
        {/** 닉네임 필드 */}
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
        {/** 자기소개 필드 */}
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
        {/** 아바타 이미지 업로드 필드 */}
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
      {/** 취소, 저장 버튼 */}
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
