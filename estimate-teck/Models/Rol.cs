﻿using System;
using System.Collections.Generic;

namespace estimate_teck.Models;

public partial class Rol
{
    public int IdRol { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
