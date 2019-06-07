import React from 'react'
import { Form, Message } from 'semantic-ui-react'

const FormSuccess = () => (
  <Form success>
    <Message success header='Form Completed' content="Your ticket in now in queue" />
  </Form>
)

export default FormSuccess