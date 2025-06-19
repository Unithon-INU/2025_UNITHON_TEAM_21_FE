package com.gibongsa.widget

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent 
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.gibongsa.R
import java.text.SimpleDateFormat
import java.util.*

class WidgetModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val PREFS_NAME = "DonationWidgetPrefs"
        const val KEY_DONATION_AMOUNT = "donationAmount"
        const val KEY_UPDATE_TIME = "updateTime"
    }

    override fun getName() = "WidgetModule"

    @ReactMethod
    fun updateWidget(donationAmount: String) {
        val context = reactApplicationContext

        val sdf = SimpleDateFormat("HH:mm", Locale.getDefault())
        val updateTime = "${sdf.format(Date())} 기준"
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit()
        prefs.putString(KEY_DONATION_AMOUNT, donationAmount)
        prefs.putString(KEY_UPDATE_TIME, updateTime)
        prefs.apply()

        val intent = Intent(context, DonationWidgetProvider::class.java).apply {
            action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
            val ids = AppWidgetManager.getInstance(context).getAppWidgetIds(
                ComponentName(context, DonationWidgetProvider::class.java)
            )
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
        }
        context.sendBroadcast(intent)
    }
}
