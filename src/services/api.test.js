import { fetchPokemonList, fetchPokemonDetails } from "./api";

global.fetch = jest.fn();

describe("fetchPokemonList", () => {
  it("should fetch a list of pokemons", async () => {
    const mockResponse = {
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchPokemonList(1);

    expect(result).toEqual(mockResponse.results);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
  });

  it("should handle an error when the fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const result = await fetchPokemonList(1);

    expect(result).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("fetchPokemonDetails", () => {
  it("should fetch pokemon details successfully", async () => {
    const mockResponse = { name: "bulbasaur", height: 7, weight: 69 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchPokemonDetails("bulbasaur");

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/bulbasaur"
    );
  });

  it("should handle an error when the fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(fetchPokemonDetails("bulbasaur")).rejects.toThrow(
      "Error fetching pokemon details"
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
