import Entity from "../shared/Entity";
import TaskName, { TaskNameProps } from "../values/TaskName";
import TaskDetail, { TaskDetailProps } from "../values/TaskDetail";
import TaskPriority, { TaskPriorityProps } from "../values/TaskPriority";
import TaskCompleted, { TaskCompletedProps } from "../values/TaskCompleted";

/**
 * - タスク名
 * - タスク詳細
 * - 優先順位(1~5) // default ３
 * - 終了フラグ // default false
 * - カテゴリ
 */
export default class Task extends Entity<TaskProps> {
  public getName() {
    return this.props.name;
  }

  public changeName(newName: string) {
    const name = TaskName.factory({
      value: newName,
    });

    this.props = { ...this.props, name };
  }

  public static factory(props: FactoryProps) {
    const name = TaskName.factory({
      value: props.name.value,
    });

    const detail = props.detail
      ? TaskDetail.factory({
          value: props.detail.value,
        })
      : undefined;

    const priority = TaskPriority.factory({
      value: props.priority?.value || 3,
    });

    const isCompleted = TaskCompleted.factory({
      value: props.isCompleted?.value || false,
    });

    return new Task({ name, detail, priority, isCompleted });
  }
}

type TaskProps = {
  id?: number;
  name: TaskName;
  detail?: TaskDetail;
  priority: TaskPriority;
  isCompleted: TaskCompleted;
  categories?: any[];
};

type FactoryProps = {
  name: TaskNameProps;
  detail?: TaskDetailProps;
  priority?: TaskPriorityProps;
  isCompleted?: TaskCompletedProps;
};
