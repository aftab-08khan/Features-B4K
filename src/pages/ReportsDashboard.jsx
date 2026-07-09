"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactionApi";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  DollarSign,
  Users,
  Award,
} from "lucide-react";

const ITEMS_PER_PAGE = 50;

export default function ReportsDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    staleTime: 5 * 60 * 1000,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("revenue-desc"); // revenue-desc | revenue-asc | name

  const filteredAndSortedData = useMemo(() => {
    if (!data) return [];

    return data
      .filter((item) => {
        const matchesSearch =
          item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.id?.toString().includes(searchQuery);
        const matchesRole =
          selectedRole === "all" || item?.role === selectedRole;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        if (sortBy === "revenue-desc")
          return (b?.revenue || 0) - (a?.revenue || 0);
        if (sortBy === "revenue-asc")
          return (a?.revenue || 0) - (b?.revenue || 0);
        if (sortBy === "name")
          return (a?.name || "").localeCompare(b?.name || "");
        return 0;
      });
  }, [data, searchQuery, selectedRole, sortBy]);

  const metrics = useMemo(() => {
    const total = filteredAndSortedData.reduce(
      (sum, item) => sum + (Number(item?.revenue) || 0),
      0,
    );
    const count = filteredAndSortedData.length;
    const average = count > 0 ? total / count : 0;

    return {
      totalRevenue: total,
      totalCount: count,
      averageRevenue: average,
    };
  }, [filteredAndSortedData]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0055BF] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-rose-600 font-mono text-sm">
        ⚠️ Telemetry Error: Failed to parse backend transaction buffers.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">
        <div className="bg-white border-2 border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#E3000B] via-[#FFD500] to-[#0055BF]" />
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#0055BF] font-black uppercase">
              B4K // FINANCES_NODE
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-0.5">
              Revenue Matrix Report
            </h1>
          </div>
          <div className="bg-slate-100 font-mono text-[11px] px-3 py-1.5 rounded-lg border text-slate-500 font-bold">
            Buffered Inventory: {data?.length?.toLocaleString()} Records Loaded
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-[#00CC5A]">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Total Gross Income
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                AED{" "}
                {metrics.totalRevenue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-[#0055BF]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Processed Receipts
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                {metrics.totalCount.toLocaleString()} Orders
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl text-[#FFD500]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Average Order Yield
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                AED{" "}
                {metrics.averageRevenue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/80 p-4 rounded-2xl shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search builder name or transaction ID token..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 outline-none transition-all font-mono"
            />
          </div>

          <div className="sm:col-span-3 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl px-3 py-2 text-sm text-slate-800 outline-none transition-all font-bold"
            >
              <option value="all">All Franchise Tiers</option>
              <option value="admin">Master Admin</option>
              <option value="owner">Franchise Owner</option>
              <option value="teacher">STEM Coach</option>
              <option value="student">Junior Builder</option>
            </select>
          </div>

          <div className="sm:col-span-4 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0055BF] focus:bg-white rounded-xl px-3 py-2 text-sm text-slate-800 outline-none transition-all font-bold"
            >
              <option value="revenue-desc">Revenue: High to Low</option>
              <option value="revenue-asc">Revenue: Low to High</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* 📋 HIGH-PERFORMANCE DATA MATRIX TABLE CONTAINER */}
        <div className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-slate-200 font-mono text-[10px] text-slate-400 font-black uppercase tracking-wider">
                  <th className="py-3 px-6 w-20">Identity</th>
                  <th className="py-3 px-6">Account Name</th>
                  <th className="py-3 px-6">Start Date</th>

                  <th className="py-3 px-6">System Role</th>
                  <th className="py-3 px-6 text-right">Yield Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr
                      key={item?.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="py-3.5 px-6">
                        {item?.avatr ? (
                          <img
                            src={item.avatr}
                            alt=""
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200 bg-slate-100 shadow-xs"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='10' r='3'/><path d='M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662'/></svg>";
                            }}
                          />
                        ) : (
                          <div className="w-9 h-9 bg-slate-100 rounded-xl border border-slate-200" />
                        )}
                      </td>

                      <td className="py-3.5 px-6 font-mono font-bold text-slate-800 uppercase tracking-wide">
                        {item?.name || "Unassigned Account"}
                        <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                          Token ID: #{item?.id || "XXXX"}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 font-mono font-black text-slate-900 group-hover:text-[#0055BF] transition-colors">
                        {new Date(item?.start_date).toLocaleDateString()}{" "}
                      </td>
                       <td className="py-3.5 px-6 font-mono font-black text-slate-900 group-hover:text-[#0055BF] transition-colors">
                        {new Date(item?.end_date).toLocaleDateString()}{" "}
                      </td>
                      <td className="py-3.5 px-6">
                        <span
                          className={`text-[9px] font-mono font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                            item?.role === "admin"
                              ? "bg-red-50 text-red-600 border border-red-100"
                              : item?.role === "owner"
                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                : item?.role === "teacher"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {item?.role || "Builder"}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right font-mono font-black text-slate-900 group-hover:text-[#0055BF] transition-colors">
                        AED{" "}
                        {(Number(item?.revenue) || 0).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 },
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-12 text-center text-xs font-mono text-slate-400"
                    >
                      🚫 No transactions match the selected filter query
                      parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
              <span className="text-xs font-mono text-slate-500 font-bold">
                Showing Page {currentPage} of {totalPages} (
                {filteredAndSortedData.length.toLocaleString()} matching nodes)
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3.5 py-1.5 bg-white border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className="px-3.5 py-1.5 bg-white border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
