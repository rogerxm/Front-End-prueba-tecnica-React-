import { describe, it, expect, vi } from "vitest";
import { getUsers } from "./userService";

const mockUsers = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
];

global.fetch = vi.fn();

// Funcion para simular una respuesta exitosa
const mockFetchSuccess = (data: any) => {
  (fetch as any).mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
};

describe("userService - Sencillo", () => {
  it("debe obtener la lista de usuarios correctamente", async () => {
    // Configurar el mock para devolver datos de éxito
    mockFetchSuccess(mockUsers);

    // Llamar a la función que estamos probando
    const users = await getUsers();

    // Verifica que la función 'fetch' se haya llamado
    expect(fetch).toHaveBeenCalledTimes(1);

    // Verifica que los datos devueltos sean los que simulamos
    expect(users).toEqual(mockUsers);

    // Verifica la longitud del array
    expect(users.length).toBe(2);
  });
});
