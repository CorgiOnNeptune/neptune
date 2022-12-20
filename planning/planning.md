# Midterm Planning

- [User Stories](user-stories.md)
- [RESTful Routes](routes.md)
- [ERD]()
- [Wireframes]()
- [Page Flow/Mockup]()
- [Tools and Resources](#tools--resources)
- [Pull Request Workflow](project-workflow.md)

&nbsp;

---

&nbsp;

### SPA or MPA?

&nbsp;

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

## API Tools

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

## UI

- [Adobe Kuller](https://color.adobe.com/create/color-wheel)
- [Google Fonts](https://fonts.google.com)
- [Font Awesome](https://fontawesome.com/)
