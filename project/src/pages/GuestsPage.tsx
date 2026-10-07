import { useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Modal } from '@/components/Modal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { StatusBadge } from '@/components/StatusBadge';
import { SearchBar } from '@/components/SearchFilter';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/useToast';
import { guestsData } from '@/data/mockData';
import type { Guest, RsvpStatus } from '@/types';

const emptyGuest: Omit<Guest, 'id'> = {
  name: '', phone: '', email: '', side: 'Bride', numberOfGuests: 1, rsvp: 'Pending', notes: '',
};

export function GuestsPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [guests, setGuests] = useState<Guest[]>(guestsData);
  const [search, setSearch] = useState('');
  const [sideFilter, setSideFilter] = useState('all');
  const [rsvpFilter, setRsvpFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Guest | null>(null);
  const [formData, setFormData] = useState<Omit<Guest, 'id'>>(emptyGuest);

  const filtered = guests.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search) ||
      g.email.toLowerCase().includes(search.toLowerCase());
    const matchSide = sideFilter === 'all' || g.side === sideFilter;
    const matchRsvp = rsvpFilter === 'all' || g.rsvp === rsvpFilter;
    return matchSearch && matchSide && matchRsvp;
  });

  const totalGuests = guests.reduce((sum, g) => sum + g.numberOfGuests, 0);
  const confirmed = guests.filter((g) => g.rsvp === 'Confirmed').reduce((s, g) => s + g.numberOfGuests, 0);
  const pending = guests.filter((g) => g.rsvp === 'Pending').reduce((s, g) => s + g.numberOfGuests, 0);
  const declined = guests.filter((g) => g.rsvp === 'Declined').reduce((s, g) => s + g.numberOfGuests, 0);

  const openAdd = () => {
    setEditingGuest(null);
    setFormData(emptyGuest);
    setIsFormOpen(true);
  };

  const openEdit = (guest: Guest) => {
    setEditingGuest(guest);
    const { id, ...rest } = guest;
    void id;
    setFormData(rest);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingGuest) {
      setGuests((prev) =>
        prev.map((g) => (g.id === editingGuest.id ? { ...formData, id: editingGuest.id } : g))
      );
      showToast('Guest updated successfully!');
    } else {
      setGuests((prev) => [...prev, { ...formData, id: `g${Date.now()}` }]);
      showToast('Guest added successfully!');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setGuests((prev) => prev.filter((g) => g.id !== deleteTarget.id));
      showToast('Guest removed.', 'info');
    }
  };

  const changeRsvp = (id: string, rsvp: RsvpStatus) => {
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, rsvp } : g)));
    showToast(`RSVP updated to ${rsvp}`);
  };

  const summaryCards = [
    { label: 'Total Guests', value: totalGuests, icon: Users, color: 'bg-burgundy-600' },
    { label: 'Confirmed', value: confirmed, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Pending', value: pending, icon: Clock, color: 'bg-champagne-500' },
    { label: 'Declined', value: declined, icon: XCircle, color: 'bg-red-500' },
  ];

  return (
    <Layout title={t('guests')} subtitle={`${guests.length} guests on the list`}>
      <PageHeader
        title="Guest Management"
        description="Track RSVPs and manage your wedding guest list"
        action={
          <button onClick={openAdd} className="btn-primary">
            <Plus className="h-4 w-4" /> {t('addGuest')}
          </button>
        }
      />

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.color} text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-semibold text-burgundy-900">{card.value}</p>
              <p className="text-sm text-charcoal/60">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search + Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, phone, email..." />
        <div>
          <label className="mb-1.5 block text-xs font-medium text-charcoal/50">Side</label>
          <select
            value={sideFilter}
            onChange={(e) => setSideFilter(e.target.value)}
            className="rounded-lg border border-burgundy-100 bg-white px-3 py-2 text-sm text-charcoal focus:border-burgundy-300 focus:outline-none focus:ring-2 focus:ring-burgundy-50"
          >
            <option value="all">All Sides</option>
            <option value="Bride">Bride</option>
            <option value="Groom">Groom</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-charcoal/50">RSVP</label>
          <select
            value={rsvpFilter}
            onChange={(e) => setRsvpFilter(e.target.value)}
            className="rounded-lg border border-burgundy-100 bg-white px-3 py-2 text-sm text-charcoal focus:border-burgundy-300 focus:outline-none focus:ring-2 focus:ring-burgundy-50"
          >
            <option value="all">All RSVP</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Desktop table */}
      <div className="card hidden overflow-hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-burgundy-50 bg-burgundy-50/30 text-left text-xs uppercase text-charcoal/50">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Side</th>
              <th className="px-4 py-3 font-semibold">Guests</th>
              <th className="px-4 py-3 font-semibold">RSVP</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id} className="border-b border-burgundy-50 last:border-0 hover:bg-burgundy-50/20">
                <td className="px-4 py-3 font-medium text-charcoal">{g.name}</td>
                <td className="px-4 py-3 text-charcoal/60">
                  <p>{g.phone}</p>
                  <p className="text-xs">{g.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${g.side === 'Bride' ? 'bg-rose-50 text-rose-700' : 'bg-champagne-50 text-champagne-700'}`}>
                    {g.side}
                  </span>
                </td>
                <td className="px-4 py-3 text-charcoal/70">{g.numberOfGuests}</td>
                <td className="px-4 py-3">
                  <select
                    value={g.rsvp}
                    onChange={(e) => changeRsvp(g.id, e.target.value as RsvpStatus)}
                    className="rounded-md border border-burgundy-100 bg-white px-2 py-1 text-xs text-charcoal focus:outline-none"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Declined">Declined</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-charcoal/50">{g.notes}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(g)} className="rounded-lg p-1.5 text-burgundy-600 hover:bg-burgundy-50" title={t('edit')}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => setDeleteTarget(g)} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50" title={t('delete')}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {filtered.map((g) => (
          <div key={g.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-charcoal">{g.name}</p>
                <p className="text-xs text-charcoal/50">{g.phone} · {g.email}</p>
              </div>
              <span className={`badge ${g.side === 'Bride' ? 'bg-rose-50 text-rose-700' : 'bg-champagne-50 text-champagne-700'}`}>
                {g.side}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-charcoal/50">{g.numberOfGuests} guests</span>
              <StatusBadge status={g.rsvp} type="rsvp" />
            </div>
            {g.notes && <p className="mt-2 text-xs text-charcoal/40">{g.notes}</p>}
            <div className="mt-3 flex gap-2">
              <select
                value={g.rsvp}
                onChange={(e) => changeRsvp(g.id, e.target.value as RsvpStatus)}
                className="flex-1 rounded-lg border border-burgundy-100 bg-white px-2 py-1.5 text-xs text-charcoal focus:outline-none"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Declined">Declined</option>
              </select>
              <button onClick={() => openEdit(g)} className="rounded-lg border border-burgundy-100 px-3 py-1.5 text-xs font-medium text-burgundy-600 hover:bg-burgundy-50">
                {t('edit')}
              </button>
              <button onClick={() => setDeleteTarget(g)} className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card mt-4 p-12 text-center">
          <p className="text-charcoal/50">No guests found matching your search.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingGuest ? 'Edit Guest' : 'Add New Guest'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Name *</label>
            <input type="text" required value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field" placeholder="Guest name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-field">Phone *</label>
              <input type="text" required value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field" placeholder="+91 ..." />
            </div>
            <div>
              <label className="label-field">Email</label>
              <input type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field" placeholder="email@example.com" />
            </div>
            <div>
              <label className="label-field">Side</label>
              <select value={formData.side}
                onChange={(e) => setFormData({ ...formData, side: e.target.value as 'Bride' | 'Groom' })}
                className="input-field">
                <option value="Bride">Bride</option>
                <option value="Groom">Groom</option>
              </select>
            </div>
            <div>
              <label className="label-field">Number of Guests</label>
              <input type="number" min={1} value={formData.numberOfGuests}
                onChange={(e) => setFormData({ ...formData, numberOfGuests: Number(e.target.value) })}
                className="input-field" />
            </div>
            <div>
              <label className="label-field">RSVP</label>
              <select value={formData.rsvp}
                onChange={(e) => setFormData({ ...formData, rsvp: e.target.value as RsvpStatus })}
                className="input-field">
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label-field">Notes</label>
            <input type="text" value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field" placeholder="Dietary preferences, etc." />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setIsFormOpen(false)} className="btn-secondary flex-1">{t('cancel')}</button>
            <button type="submit" className="btn-primary flex-1">{editingGuest ? t('save') : t('addGuest')}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove Guest"
        message={`Remove "${deleteTarget?.name}" from the guest list?`}
      />
    </Layout>
  );
}
