import React from 'react';
import { List, Lock, Trash2 } from 'lucide-react';

export default function UserSettings({
  prefTab, setPrefTab, role, handleSavePassword, currentPassword, setCurrentPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword, deleteInput, setDeleteInput, handleDeleteAccount
}) {
  return (
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                   
                   {/* Left Sidebar Menu for Preferences */}
                   <div className="md:col-span-1 flex flex-col gap-2">
                      <button 
                         onClick={() => setPrefTab('notifications')}
                         className={`text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-3 ${prefTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                         <List className="w-4 h-4" /> Tùy chọn chung
                      </button>
                      <button 
                         onClick={() => setPrefTab('security')}
                         className={`text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-3 ${prefTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                         <Lock className="w-4 h-4" /> Đổi mật khẩu
                      </button>
                      {role !== 'admin' && (
                        <button 
                           onClick={() => setPrefTab('danger')}
                           className={`text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-3 ${prefTab === 'danger' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                           <Trash2 className="w-4 h-4" /> Xóa tài khoản
                        </button>
                      )}
                   </div>
                   
                   {/* Content Area for Preferences */}
                   <div className="md:col-span-3">
                     
                     {prefTab === 'notifications' && (
                       <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
                         <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2"><List className="w-5 h-5 text-gray-500" /> Tùy chọn chung</h3>
                         <div className="space-y-6">
                           <div className="flex items-center justify-between">
                             <div>
                               <p className="font-semibold text-gray-800">Thông báo Email</p>
                               <p className="text-sm text-gray-500 mt-1">Nhận email khi có tin nhắn mới hoặc cập nhật dự án.</p>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                               <input type="checkbox" className="sr-only peer" defaultChecked />
                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                             </label>
                           </div>
                           <div className="flex items-center justify-between">
                             <div>
                               <p className="font-semibold text-gray-800">Hiển thị trực tuyến</p>
                               <p className="text-sm text-gray-500 mt-1">Cho phép người khác thấy khi bạn đang online.</p>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                               <input type="checkbox" className="sr-only peer" defaultChecked />
                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                             </label>
                           </div>
                         </div>
                       </div>
                     )}

                     {prefTab === 'security' && (
                       <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
                         <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2"><Lock className="w-5 h-5 text-gray-500" /> Đổi mật khẩu</h3>
                         <form onSubmit={handleSavePassword} className="space-y-5">
                           <div className="flex flex-col">
                             <span className="text-sm font-semibold text-gray-700 mb-2">Mật khẩu hiện tại</span>
                             <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                           </div>
                           <div className="flex flex-col">
                             <span className="text-sm font-semibold text-gray-700 mb-2">Mật khẩu mới</span>
                             <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                           </div>
                           <div className="flex flex-col">
                             <span className="text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu mới</span>
                             <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                           </div>
                           <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold mt-4 shadow-sm transition-colors w-full sm:w-auto">
                             Cập nhật mật khẩu
                           </button>
                         </form>
                       </div>
                     )}

                     {prefTab === 'danger' && role !== 'admin' && (
                       <div className="bg-white p-8 rounded-xl border border-red-200 shadow-sm max-w-2xl">
                         <h3 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2"><Trash2 className="w-5 h-5 text-red-500" /> Xóa Tài Khoản</h3>
                         <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                           Khi bạn xóa tài khoản, tất cả dữ liệu bao gồm hồ sơ, dự án, lịch sử giao dịch và tin nhắn sẽ bị xóa vĩnh viễn và không thể khôi phục.
                         </p>
                         <div className="mb-6">
                           <label className="block text-sm font-semibold text-gray-700 mb-2">Vui lòng nhập <span className="font-bold text-red-600">DELETE</span> để xác nhận:</label>
                           <input type="text" value={deleteInput} onChange={e=>setDeleteInput(e.target.value)} placeholder="Nhập DELETE..." className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                         </div>
                         <button onClick={handleDeleteAccount} disabled={deleteInput !== 'DELETE'} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors w-full sm:w-auto shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                           Xác nhận Xóa Tài Khoản
                         </button>
                       </div>
                     )}
                     
                   </div>
                 </div>
  );
}
