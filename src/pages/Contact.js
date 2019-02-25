import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import API from '../api';
import Loader from '../common/Loader';
import { zoomIn } from '../common/animations';

/*
  Basic forms in react can be accomplished by using contolled components and the
  component's state.

  The event.preventDefault(), removes the default behavior for HTML forms, that
  are "sent" to a server inmediately after submit. Using this function we can
  add our on behavior to the submit.
*/
class Contact extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    submitting: false,
    submitted: false,
    submittedMessage: '',
  }

  handleInputChange = (event, field) => {
    const newState = this.state;
    newState[field] = event.target.value;

    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ submitting: true });

    API.post('/contact', {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    })
      .then(res => {
        setTimeout(() => {
          this.setState({
            submitting: false,
            submitted: true,
            submittedMessage: `Your message has been sent. We'll get back to you as soon as possible.`,
          });
        }, 1500);
      })
      .catch(error => {
        setTimeout(() => {
          this.setState({
            submitting: false,
            submitted: true,
            submittedMessage: `An error ocurred. Please, try again later.`,
          });
        }, 1500);
      });
  }

  renderForm = () => {
    const {
      name,
      email,
      message,
    } = this.state;

    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }} xs="12">
          <FormContainer>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  onChange={(event) => this.handleInputChange(event, 'name')}
                  value={name}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@exmp.com"
                  onChange={(event) => this.handleInputChange(event, 'email')}
                  value={email}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="message">Message</Label>
                <Input
                  type="textarea"
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="Type your message here..."
                  onChange={(event) => this.handleInputChange(event, 'message')}
                  value={message}
                  required
                />
              </FormGroup>

              <Button
                type="submit"
                color="info"
              >
                Submit
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    );
  }

  renderMessage = () => {
    const { submittedMessage } = this.state;

    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }} xs="12">
          <FormContainer>
            <MessageContainer>
              <p>
                {submittedMessage}
              </p>
              <Button
                color="info"
                onClick={() => {this.props.history.goBack()}}
              >
                Back
              </Button>
            </MessageContainer>
          </FormContainer>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      submitting,
      submitted,
    } = this.state;

    if (submitting) {
      return <Loader />;
    }

    return (
      <Container>
        <Title>
          Contact Us
        </Title>

        {
          submitted
            ? this.renderMessage()
            : this.renderForm()
        }
      </Container>
    );
  }
}

export default withRouter(Contact);

const Title = styled.h1`
  margin-top: 30px;
  text-align: center;
  color: rgb(23,162,184);
`;

const FormContainer = styled.div`
  border: 1px solid #17a2b8;
  border-radius: .5rem;
  padding: 20px;
  animation: ${zoomIn} 0.4s linear;
`;

const MessageContainer = styled.div`
  font-size: 18px;
  text-align: center;
`;
