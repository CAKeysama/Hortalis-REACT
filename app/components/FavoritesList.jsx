import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { HORTAS_MOCK } from "../data/hortas";

const buildNameMap = (hortas) =>
  hortas.reduce((acc, horta) => {
    acc[horta.id] = horta.nome;
    return acc;
  }, {});

export default function FavoritesList({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nameMap = useMemo(() => buildNameMap(HORTAS_MOCK), []);

  useEffect(() => {
    if (!user) return;

    let active = true;

    const loadFavorites = async () => {
      setLoading(true);
      setError("");

      try {
        let hortaIds = [];

        const docRef = doc(db, "favoritos", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.exists() ? docSnap.data() : null;

        if (Array.isArray(data?.hortas)) {
          hortaIds = data.hortas;
        } else {
          const q = query(
            collection(db, "favoritos"),
            where("userId", "==", user.uid)
          );
          const snap = await getDocs(q);
          hortaIds = snap.docs
            .map((item) => item.data()?.hortaId)
            .filter(Boolean);
        }

        const list = hortaIds.map((id) => ({
          id,
          nome: nameMap[id] || `Horta ${id}`,
        }));

        if (active) {
          setFavorites(list);
        }
      } catch (err) {
        if (active) {
          setError("Nao foi possivel carregar seus favoritos.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadFavorites();

    return () => {
      active = false;
    };
  }, [nameMap, user]);

  return (
    <section className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg shadow-hortalis-forest/10">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-hortalis-forest">
          Hortas favoritas
        </p>
        <Link
          to="/mapa"
          className="rounded-full border border-hortalis-forest/20 bg-white px-3 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
        >
          Ver mapa
        </Link>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-500">Carregando favoritos...</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : favorites.length === 0 ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-slate-500">
            Voce ainda nao favoritou nenhuma horta.
          </p>
          <Link
            to="/mapa"
            className="inline-flex rounded-full bg-hortalis-leaf px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white shadow-sm shadow-hortalis-leaf/20 transition hover:bg-hortalis-forest"
          >
            Encontrar horta
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {favorites.map((horta) => (
            <li
              key={horta.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-hortalis-ink/60">
                  Favorita
                </p>
                <p className="mt-1 text-sm font-semibold text-hortalis-ink">
                  {horta.nome}
                </p>
              </div>
              <Link
                to="/mapa"
                className="rounded-full border border-hortalis-forest/20 bg-white px-3 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-hortalis-forest transition hover:border-hortalis-forest hover:bg-hortalis-forest hover:text-white"
              >
                Ver no mapa
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
