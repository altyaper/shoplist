export interface Task {
  idx: number;
  createdAt: string;
  done: boolean;
  text: string;
  deleteOnComplete: boolean;
}

export interface HamburgerButtonProps {
  open?: boolean;
  onClick?: () => void;
  lineSize?: string;
}

export interface BlackSideProps {
  sideOpen: boolean;
}

export interface TaskProps {
  onMarkDone: (task: Task) => void;
  task: Task;
}

export interface FlagProps {
  done?: boolean;
}