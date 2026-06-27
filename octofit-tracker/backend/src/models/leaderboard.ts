import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userName: string;
  score: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userName: { type: String, required: true, unique: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
