import tensorflow as tf
import numpy as np

class TrafficAI:
    def _init_(self):
        self.model = self.build_model()

    def build_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(16, activation='relu', input_shape=(1,)),
            tf.keras.layers.Dense(16, activation='relu'),
            tf.keras.layers.Dense(1, activation='linear')
        ])
        model.compile(optimizer='adam', loss='mse')
        return model

    def predict_light_time(self, vehicle_count):
        return max(10, min(120, self.model.predict(np.array([[vehicle_count]]))[0][0]))