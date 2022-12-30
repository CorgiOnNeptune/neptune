# Midterm Planning

- [User Stories](user-stories.md)
- [RESTful Routes](routes.md)
- [ERD]()
- [Wireframes](wireframe.jpg)
- [Page Flow/Mockup]()
- [Tools and Resources](#tools--resources)
- [Pull Request Workflow](project-workflow.md)

&nbsp;

---

## Features

- Add/edit tasks
- Categorize by shopping, watch, red, eat
- Filter by category or by all
- Mark tasks as complete
- Due dates
- More info via the APIs

### User Login

- Don't bother

```js
// do this instead
app.get("/login/:id", (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // send the user somewhere
  res.redirect("/");
});
```

&nbsp;

# Tools & Resources

## Wireframe

- [FIGMA](https://www.figma.com/)

## Project Management

- [Trello](https://trello.com/)
- GitHub Projects

## API Tools

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

## UI

- [Adobe Kuller](https://color.adobe.com/create/color-wheel)
- [Google Fonts](https://fonts.google.com)
- [Font Awesome](https://fontawesome.com/)

## Other

- [Place Kitten](http://placekitten.com/)
- [Ipsums](http://meettheipsums.com/)
