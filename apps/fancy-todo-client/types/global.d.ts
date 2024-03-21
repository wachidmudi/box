type GoogleUser = ReturnType<gapi.auth2.GoogleAuth['currentUser']['get']>;

interface Window {
  createBtn(el: HTMLButtonElement, title: string): void;
  login(e: SubmitEvent): void;
  register(e: SubmitEvent): void;
  logout(): void;
  showModalAddImage(id: string): void;
  setTodoId(id: string): void;
  addTodo(e: SubmitEvent): void;
  updateTodo(e: SubmitEvent): void;
  deleteTodo(id: string): void;
  addImage(e: SubmitEvent): void;
  updateImage(): void;
  clearForm(): void;
  clearTodoForm(): void;
  onSignIn(googleUser: GoogleUser): void;
  onSignOut(): void;
  removeToken(): void;
  goToRegister(): void;
}
