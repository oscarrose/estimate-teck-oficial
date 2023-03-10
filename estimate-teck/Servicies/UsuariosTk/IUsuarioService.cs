namespace estimate_teck.Servicies.UsuariosTk
{
    public interface IUsuarioService
    {
        string GetMyName();

        /// <summary>
        /// method to verify the user is state activo
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        bool UserActive(int userId);

        // Verification method if employee has user
        bool EmployeeHasUser(int id);

        /// <summary>
        /// method for create password the user
        /// </summary>
        /// <param name="password">default</param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        void CreatePasswordHash(string password,out byte[] passwordHash, out byte[] passwordSalt);

        /// <summary>
        /// method for valid password the user
        /// </summary>
        /// <param name="password">default</param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] PasswordSalt);
    }




}
