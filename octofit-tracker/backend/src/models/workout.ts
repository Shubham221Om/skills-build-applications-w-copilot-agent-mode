import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  focusArea: string;
  durationMinutes: number;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  focusArea: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
