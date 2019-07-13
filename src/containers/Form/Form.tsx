import * as React from 'react';
import { Button, TextField } from '@material-ui/core';

interface inputType {
  value: string;
  error: string;
}

const Form: React.FC = () => {
  const [name, setName]: [string, (value: string) => void] = React.useState<
    string
  >('');

  const [nameError, setNameError]: [
    string,
    (value: string) => void
  ] = React.useState('');

  const [story, setStory]: [string, (value: string) => void] = React.useState(
    ''
  );

  const [storyError, setStoryError]: [
    string,
    (value: string) => void
  ] = React.useState('');

  const onChangeInputNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const onChangeInputStoryHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStory(event.target.value);
  };

  const checkValidity = () => {
    let isErrors = false;
    const errors = { nameError: '', storyError: '' };
    if (name.length < 5) {
      isErrors = true;
      errors.nameError = 'Name needs to be more then 5 characters';
    }

    if (story.indexOf('@') >= 0) {
      isErrors = true;
      errors.storyError = 'You should not include @';
    }

    if (isErrors) {
      setNameError(errors.nameError);
      setStoryError(errors.storyError);
    }

    return isErrors;
  };

  const submitHundler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const err = checkValidity();
    if (!err) {
      setName('');
      setNameError('');
      setStory('');
      setStoryError('');
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          Accept: 'application/json text/plain, */*',
          'Content-type': 'application/jsonn'
        },
        body: JSON.stringify({ title: 'Costas', body: 'Ta lemee' })
      })
        .then(res => res.json())
        .then(data => console.log(data));
    }
  };

  return (
    <form onSubmit={submitHundler} noValidate={true}>
      <TextField
        label="Name"
        placeholder="Set your Name"
        fullWidth
        margin="normal"
        required
        onChange={onChangeInputNameHandler}
        error={nameError !== ''}
        helperText={nameError !== '' ? nameError : ''}
        value={name}
      />
      <TextField
        label="Story"
        placeholder="Tell your Story"
        fullWidth
        multiline
        margin="normal"
        value={story}
        onChange={onChangeInputStoryHandler}
        error={storyError !== ''}
        helperText={storyError !== '' ? storyError : ''}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
