import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from './input'; 
import './style.css'

const valid = yup.object().shape({
edrpou: yup.string().matches(/^[0-9]{8,10}$/, "Введіть коректний ЄДРПОУ або РНОКПП").required("ЄДРПОУ або РНОКПП обов'язковий"),
receiverName: yup.string().required("Введіть назву одержувача"),
iban: yup.string().matches(/^UA\d{29}$/, "Введіть коректний IBAN").required("Рахунок IBAN обов'язковий"),
paymentPurpose: yup.string().required("Вкажіть призначення переказу"),
isBudgetPayment: yup.boolean(),
amount: yup.number().typeError("Сума повинна бути числом").positive("Сума має бути додатною").required("Сума обов'язкова"),
cardNumber: yup.string().matches(/^[0-9]{16}$/, "Номер картки має бути 16 цифр").required("Номер картки обов'язковий"),
expiryDate: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Невірний формат дати (MM/YY)").required("Термін дії картки обов'язковий"),
cvv: yup.string().matches(/^[0-9]{3}$/, "CVV має бути 3 цифри").required("CVV обов'язковий"),
});
const Form = () => {
  const { register, handleSubmit, formState: { errors },} = useForm
  (
    {
        resolver: yupResolver(valid),
    }
);
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="receiver">
      <h2>Одержувач</h2>
      <Input label="ЄДРПОУ або РНОКПП:" id="edrpou" register={register} errors={errors} type="text"/>
      <Input label="Назва одержувача:" id="receiverName" register={register} errors={errors} type="text"/>
      <Input label="Рахунок IBAN:" id="iban" register={register} errors={errors} type="text"/>
      </div>
      <div className="category">
      <h2>Категорія платежу</h2>
      <Input label="Бюджетний платіж" id="isBudgetPayment" register={register} errors={errors} type="checkbox"/>
      <Input label="Інші платежі:" id="paymentCategory" register={register} errors={errors} type="select"
      options={[
    { value: 'other', label: 'Інші платежі' },
    { value: 'internet', label: 'Інтернет/Телебачення/Телеком послуги' },
    { value: 'credit', label: 'Погашення кредиту' },
    { value: 'products', label: 'Оплата товарів і послуг' },
  ]}/>
      <Input label="Призначення платежу:" id="paymentPurpose" register={register} errors={errors} type="text"/>
      </div>
      <div className="contact">
        <h2> Дані карти </h2>
      <Input label="Ім'я відправника:" id="senderName" register={register} errors={errors} />
      <Input label="Номер картки:" id="cardNumber" register={register} errors={errors} type="text"/>
      <Input label="Термін дії (MM/YY):" id="expiryDate" register={register} errors={errors}type="text"/>
      <Input label="CVV:" id="cvv" register={register} errors={errors} type="text"/>
      <Input label="Сума платежу:" id="amount" register={register} errors={errors} type="number"/>
      </div>
      <button type="submit">Оплатити</button>
    </form>
  );
};

export default Form;
