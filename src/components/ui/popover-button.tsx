import { cn } from "@/lib/utils";
import { Popover, PopoverClose, PopoverTrigger } from "@radix-ui/react-popover";
import { EllipsisVerticalIcon, type LucideIcon } from "lucide-react";
import { Button } from "./button";
import { PopoverContent } from "./popover";
import { Fragment } from "react/jsx-runtime";
import { Separator } from "./separator";

interface PopoverButtonProps {
  buttonList: Array<{
    icon: LucideIcon;
    label: string;
    disabled?: boolean;
    props?: React.ComponentProps<"button">;
    onClick?: () => void;
  }>;
  buttonProps?: React.ComponentProps<"button">;
  popoverClassName?: string;
  TriggerIcon?: React.ReactNode;
  onClose?: () => void;
}

const PopoverButton = ({
  buttonList,
  popoverClassName,
  buttonProps,
  TriggerIcon = <EllipsisVerticalIcon className="size-4" />,
  onClose,
}: PopoverButtonProps) => {
  return (
    <Popover onOpenChange={onClose}>
      <PopoverTrigger asChild>
        <Button
          className="rounded-full"
          variant="ghost"
          size="icon"
          {...buttonProps}
        >
          {TriggerIcon}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("flex flex-col p-0 w-30", popoverClassName)}
      >
        {buttonList.map((button, index) => (
          <Fragment key={button.label}>
            <PopoverClose asChild>
              <Button
                className="w-full justify-start"
                variant="ghost"
                disabled={button.disabled}
                onClick={button.onClick}
              >
                <button.icon className="size-4" />
                {button.label}
              </Button>
            </PopoverClose>
            {index !== buttonList.length - 1 && <Separator />}
          </Fragment>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverButton;
