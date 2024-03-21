/**
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/google-one-tap/index.d.ts
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/google.accounts/index.d.ts
 * When your callback function is invoked, a CredentialResponse object
 * is passed as the parameter.
 */
export interface CredentialResponse {
  /**
   * the ID token as a base64-encoded JSON Web Token (JWT) string.
   */
  credential: string;

  /**
   * This field sets how the credential is selected.
   */
  select_by:
    | 'auto'
    | 'user'
    | 'user_1tap'
    | 'user_2tap'
    | 'btn'
    | 'btn_confirm'
    | 'btn_add_session'
    | 'btn_confirm_add_session';
}
