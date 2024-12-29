import { Cascader, CascaderOption } from 'antd-mobile';

export const FormCascader: React.FC<{
  value?: string[];
  onChange?: (value: unknown) => void;
  options: CascaderOption[];
  categoryVisible: boolean;
  setCategoryVisible: (visiable: boolean) => void;
}> = (props) => {
  const { value, onChange = () => {}, options, categoryVisible, setCategoryVisible } = props;
  console.log(value);
  return (
    <div onClick={() => setCategoryVisible(true)}>
      <div>{getLabelsFromValue(options, value)}</div>
      <Cascader options={options} visible={categoryVisible} onClose={() => setCategoryVisible(false)} onConfirm={(value) => onChange(value)} />
    </div>
  );
};

const getLabelsFromValue = (options: CascaderOption[], value?: string[]) => {
  if (!value) {
    return '请选择类别';
  }
  const labels = [];
  let currentOptions = options;

  for (const val of value) {
    const option = currentOptions.find((opt) => opt.value === val);
    if (option) {
      labels.push(option.label);
      currentOptions = option.children || [];
    } else {
      break;
    }
  }

  return labels[labels.length - 1] || '请选择类别';
};
