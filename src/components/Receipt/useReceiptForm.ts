import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import moment from 'moment';

import { useSelector, defaultCategorySelect, miSelect } from '~/store';

interface DefaultItemValueType {
  name: string
  price: string
  categoryId: string
  users?: {
    [id: string]: string
  }
}
interface DefaultValuesType {
  authorId: string
  date: string
  shop: string
  items: DefaultItemValueType[]
}

const useReceiptForm = () => {
  const defaultCategoryId = useSelector(defaultCategorySelect()).id;
  const miId = useSelector(miSelect()).id;
  const defaultValueItem = {
    name: '',
    price: '',
    categoryId: defaultCategoryId,
    users: {},
  };
  const defaultValues = {
    authorId: miId,
    date: moment().format('YYYY-MM-DDTHH:MM'),
    shop: '',
    items: [defaultValueItem],
  };
  const {
    control, handleSubmit, reset, getValues, setValue,
  } = useForm<DefaultValuesType>({ defaultValues });
  const { fields: items, append, remove } = useFieldArray<DefaultItemValueType>({
    control, name: 'items',
  });
  const [disabledForm, setDisabledForm] = useState(false);

  const onFetchForm = (data: {
    date: string
    shop: string
    items: { name: string, price: string }[]
  }) => reset({
    ...defaultValues,
    ...data,
    items: data.items.map((item) => ({ ...defaultValueItem, ...item })),
  });

  const onToggleDisabledForm = () => setDisabledForm(!disabledForm);

  const onSubmit = () => handleSubmit(onToggleDisabledForm);

  const onAddItem = () => append(defaultValueItem);

  const onDeleteItem = (indexItem: number) => remove(indexItem);

  return {
    control,
    getValues,
    setValue,
    items,
    onFetchForm,
    onSubmit,
    onAddItem,
    onDeleteItem,
    disabledForm,
    onToggleDisabledForm,
  };
};

export default useReceiptForm;
