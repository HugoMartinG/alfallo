import { useState } from "react";
import { CATALOGO } from "../data/ejercicios.js";
import { RUTINAS_INICIALES } from "../data/rutinas.js";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const nombreEjercicio = (id) => CATALOGO.find((e) => e.id === id)?.nombre ?? id;
const totalSeries = (r) => r.ejercicios.reduce((acc, e) => acc + e.series, 0);

const inputClase =
  "w-full rounded-lg border border-borde bg-fondo px-3 py-2 text-sm text-white outline-none focus:border-primario";

/* ---------- Formulario de crear / editar ---------- */
function RutinaForm({ inicial, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? "");
  const [dia, setDia] = useState(inicial?.dia ?? "Lunes");
  const [ejercicios, setEjercicios] = useState(inicial?.ejercicios ?? []);
  const [nuevo, setNuevo] = useState(CATALOGO[0].id);
  const [error, setError] = useState("");

  const anadir = () => {
    if (ejercicios.some((e) => e.ejercicioId === nuevo)) return;
    setEjercicios([...ejercicios, { ejercicioId: nuevo, series: 3, reps: 10 }]);
  };

  const cambiar = (i, campo, valor) =>
    setEjercicios(
      ejercicios.map((e, idx) =>
        idx === i ? { ...e, [campo]: Math.max(1, Number(valor) || 1) } : e
      )
    );

  const quitar = (i) => setEjercicios(ejercicios.filter((_, idx) => idx !== i));

  const enviar = (ev) => {
    ev.preventDefault();
    if (!nombre.trim()) return setError("Ponle un nombre a la rutina.");
    if (ejercicios.length === 0) return setError("Añade al menos un ejercicio.");
    onGuardar({
      id: inicial?.id ?? crypto.randomUUID(),
      nombre: nombre.trim(),
      dia,
      ejercicios,
    });
  };

  return (
    <form onSubmit={enviar} className="rounded-2xl border border-primario/40 bg-superficie p-5">
      <h3 className="text-lg font-bold">{inicial ? "Editar rutina" : "Nueva rutina"}</h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_180px]">
        <label className="text-xs text-suave">
          Nombre
          <input
            className={`${inputClase} mt-1`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Torso A"
          />
        </label>
        <label className="text-xs text-suave">
          Día
          <select className={`${inputClase} mt-1`} value={dia} onChange={(e) => setDia(e.target.value)}>
            {DIAS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5">
        <p className="text-xs text-suave">Ejercicios</p>

        {ejercicios.length === 0 && (
          <p className="mt-2 rounded-lg border border-dashed border-borde p-4 text-center text-sm text-suave">
            Aún no hay ejercicios. Añade uno del catálogo.
          </p>
        )}

        <ul className="mt-2 space-y-2">
          {ejercicios.map((e, i) => (
            <li key={e.ejercicioId} className="flex flex-wrap items-center gap-3 rounded-lg bg-fondo p-3">
              <span className="min-w-36 flex-1 text-sm font-medium">{nombreEjercicio(e.ejercicioId)}</span>
              <label className="flex items-center gap-2 text-xs text-suave">
                Series
                <input
                  type="number"
                  min="1"
                  className="w-16 rounded-md border border-borde bg-superficie px-2 py-1 text-sm text-white"
                  value={e.series}
                  onChange={(ev) => cambiar(i, "series", ev.target.value)}
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-suave">
                Reps
                <input
                  type="number"
                  min="1"
                  className="w-16 rounded-md border border-borde bg-superficie px-2 py-1 text-sm text-white"
                  value={e.reps}
                  onChange={(ev) => cambiar(i, "reps", ev.target.value)}
                />
              </label>
              <button
                type="button"
                onClick={() => quitar(i)}
                className="rounded-md px-2 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/10"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex gap-2">
          <select className={inputClase} value={nuevo} onChange={(e) => setNuevo(e.target.value)}>
            {CATALOGO.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre} · {c.grupo}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={anadir}
            className="shrink-0 rounded-lg bg-elevada px-4 text-sm font-semibold hover:bg-borde"
          >
            Añadir
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primario px-5 py-2.5 text-sm font-bold text-fondo hover:brightness-110"
        >
          Guardar rutina
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-suave hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

/* ---------- Tarjeta de rutina ---------- */
function RutinaCard({ rutina, onEditar, onEliminar }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <article className="rounded-2xl border border-borde bg-superficie p-5 transition hover:border-primario/40">
      <p className="text-[10px] font-bold uppercase tracking-widest text-suave">{rutina.dia}</p>
      <h3 className="mt-2 text-lg font-bold">{rutina.nombre}</h3>
      <p className="mt-1 text-xs font-semibold text-acento">
        {rutina.ejercicios.length} ejercicios · {totalSeries(rutina)} series
      </p>

      {abierta && (
        <ul className="mt-4 space-y-1 border-t border-borde pt-3">
          {rutina.ejercicios.map((e) => (
            <li key={e.ejercicioId} className="flex justify-between text-sm">
              <span>{nombreEjercicio(e.ejercicioId)}</span>
              <span className="text-suave">
                {e.series} × {e.reps}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
        <button
          onClick={() => setAbierta(!abierta)}
          aria-expanded={abierta}
          className="rounded-lg bg-elevada px-3 py-2 hover:bg-borde"
        >
          {abierta ? "Ocultar" : "Ver ejercicios"}
        </button>
        <button onClick={() => onEditar(rutina)} className="rounded-lg bg-elevada px-3 py-2 hover:bg-borde">
          Editar
        </button>
        <button
          onClick={() => onEliminar(rutina)}
          className="rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

/* ---------- Componente principal ---------- */
export default function RutinasApp() {
  const [rutinas, setRutinas] = useState(RUTINAS_INICIALES);
  const [editando, setEditando] = useState(null); // null | "nueva" | objeto rutina

  const guardar = (rutina) => {
    setRutinas((prev) =>
      prev.some((r) => r.id === rutina.id)
        ? prev.map((r) => (r.id === rutina.id ? rutina : r))
        : [...prev, rutina]
    );
    setEditando(null);
  };

  const eliminar = (rutina) => {
    if (window.confirm(`¿Eliminar "${rutina.nombre}"?`)) {
      setRutinas((prev) => prev.filter((r) => r.id !== rutina.id));
    }
  };

  return (
    <section>
      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-lg font-bold">Tus sesiones de la semana</h2>
        {editando === null && (
          <button
            onClick={() => setEditando("nueva")}
            className="rounded-lg bg-primario px-4 py-2 text-sm font-bold text-fondo hover:brightness-110"
          >
            + Nueva rutina
          </button>
        )}
      </div>

      {editando !== null && (
        <div className="mb-6">
          <RutinaForm
            key={editando === "nueva" ? "nueva" : editando.id}
            inicial={editando === "nueva" ? null : editando}
            onGuardar={guardar}
            onCancelar={() => setEditando(null)}
          />
        </div>
      )}

      {rutinas.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-borde p-8 text-center text-sm text-suave">
          No tienes rutinas todavía. Crea la primera con el botón de arriba.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {rutinas.map((r) => (
            <RutinaCard key={r.id} rutina={r} onEditar={setEditando} onEliminar={eliminar} />
          ))}
        </div>
      )}
    </section>
  );
}