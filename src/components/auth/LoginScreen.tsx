import { useForm } from 'react-hook-form';

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="username"
        {...register('username', { required: true, maxLength: 12 })}
      />
      <input
        type="password"
        placeholder="password"
        {...register('password', { required: true, maxLength: 20 })}
      />

      <input type="submit" />
    </form>
  );
};
